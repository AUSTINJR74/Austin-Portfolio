import { useEffect, useMemo, useState } from 'react';

interface GithubProofProps {
  username: string;
  onViewWork: () => void;
  data?: {
    total: Record<string, number>;
    contributions: {
      date: string;
      count: number;
      level?: number;
    }[];
  };
}

interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionYear {
  year: number | string;
  total: number;
  weeks: ContributionWeek[];
}

const heatColors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
const activityMix = [
  { label: 'Pull requests', value: 45 },
  { label: 'Commits', value: 35 },
  { label: 'Code review', value: 18 },
  { label: 'Issues', value: 2 },
];

const startOfWeek = (date: Date) => {
  const result = new Date(date);
  const day = result.getDay();
  result.setDate(result.getDate() - day);
  result.setHours(0, 0, 0, 0);
  return result;
};

const endOfWeek = (date: Date) => {
  const result = startOfWeek(date);
  result.setDate(result.getDate() + 6);
  return result;
};

const normalizeWeeks = (days: ContributionDay[]): ContributionWeek[] => {
  if (!days.length) return [];
  const sorted = [...days].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const lookup = new Map(sorted.map((day) => [day.date, day]));
  const start = startOfWeek(new Date(sorted[0].date));
  const end = endOfWeek(new Date(sorted[sorted.length - 1].date));
  const weeks: ContributionWeek[] = [];
  let currentWeek: ContributionDay[] = [];
  const cursor = new Date(start);

  while (cursor <= end) {
    const iso = cursor.toISOString().slice(0, 10);
    currentWeek.push(
      lookup.get(iso) ?? { date: iso, contributionCount: 0 }
    );

    if (currentWeek.length === 7) {
      weeks.push({ contributionDays: currentWeek });
      currentWeek = [];
    }

    cursor.setDate(cursor.getDate() + 1);
  }

  if (currentWeek.length) {
    while (currentWeek.length < 7) {
      const iso = cursor.toISOString().slice(0, 10);
      currentWeek.push({ date: iso, contributionCount: 0 });
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push({ contributionDays: currentWeek });
  }

  return weeks;
};

const buildYearsFromStaticData = (payload: GithubProofProps['data']): ContributionYear[] => {
  if (!payload?.contributions?.length) return [];
  const byYear = new Map<string, ContributionDay[]>();
  payload.contributions.forEach((entry) => {
    const year = new Date(entry.date).getFullYear().toString();
    const normalized: ContributionDay = {
      date: entry.date,
      contributionCount: entry.count,
    };
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year)!.push(normalized);
  });

  return Array.from(byYear.entries())
    .map(([year, days]) => ({
      year,
      total:
        payload.total?.[year] ?? days.reduce((sum, day) => sum + day.contributionCount, 0),
      weeks: normalizeWeeks(days),
    }))
    .sort((a, b) => Number(b.year) - Number(a.year));
};

export const GithubProof = ({ username, onViewWork, data }: GithubProofProps) => {
  const [yearsData, setYearsData] = useState<ContributionYear[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      if (data?.contributions?.length) {
        const normalized = buildYearsFromStaticData(data);
        if (!ignore) {
          setYearsData(normalized);
          setSelectedYear((normalized[0]?.year ?? '').toString());
          setIsLoading(false);
          setError(null);
        }
        return;
      }

      setIsLoading(true);
      try {
        const endpoints = [
          `https://github-contributions-api.jogruber.de/v4/${username}`,
          `https://cors.isomorphic-git.org/https://github-contributions-api.jogruber.de/v4/${username}`,
          `https://corsproxy.io/?https://github-contributions-api.jogruber.de/v4/${username}`,
        ];

        let json: any = null;
        let lastError: Error | null = null;
        for (const endpoint of endpoints) {
          try {
            const response = await fetch(endpoint, { cache: 'no-store' });
            if (!response.ok) throw new Error('Failed to fetch contributions');
            json = await response.json();
            break;
          } catch (err) {
            lastError = err as Error;
          }
        }

        if (!json) {
          throw lastError ?? new Error('Unable to reach GitHub activity API');
        }

        if (ignore) return;
        const sorted: ContributionYear[] = (json?.years ?? []).sort(
          (a: ContributionYear, b: ContributionYear) => Number(b.year) - Number(a.year)
        );
        setYearsData(sorted);
        setSelectedYear((sorted[0]?.year ?? '').toString());
        setError(null);
      } catch (err) {
        if (!ignore) setError('Unable to load GitHub activity at the moment.');
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };
    load();
    return () => {
      ignore = true;
    };
  }, [username, data]);

  const selectedYearData = useMemo(
    () => yearsData.find((entry) => entry.year.toString() === selectedYear),
    [yearsData, selectedYear]
  );

  const yearDays = useMemo(() => {
    if (!selectedYearData) return [] as ContributionDay[];
    return selectedYearData.weeks.flatMap((week) => week.contributionDays);
  }, [selectedYearData]);

  const yearTotal = selectedYearData?.total ?? 0;
  const maxDaily = yearDays.reduce((max, day) => Math.max(max, day.contributionCount), 0);
  const monthlyTotals = useMemo(() => {
    const buckets = Array.from({ length: 12 }, () => 0);
    yearDays.forEach((day) => {
      const month = new Date(day.date).getMonth();
      buckets[month] += day.contributionCount;
    });
    return buckets;
  }, [yearDays]);

  const monthlyBreakdown = useMemo(
    () =>
      monthlyTotals
        .map((total, idx) => ({ monthIdx: idx, total }))
        .filter((entry) => entry.total > 0),
    [monthlyTotals]
  );

  const minCommitDay = useMemo(() => {
    const positives = yearDays.filter((day) => day.contributionCount > 0);
    if (!positives.length) return null;
    return positives.reduce((min, day) => (day.contributionCount < min.contributionCount ? day : min));
  }, [yearDays]);

  const maxCommitDay = useMemo(() => {
    if (!yearDays.length) return null;
    return yearDays.reduce((max, day) => (day.contributionCount > max.contributionCount ? day : max));
  }, [yearDays]);

  const averagePerDay = yearDays.length ? Math.round(yearTotal / yearDays.length) : 0;
  const bestMonthIndex = monthlyTotals.indexOf(Math.max(...monthlyTotals));
  const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'short' });
  const bestMonthLabel = bestMonthIndex >= 0 ? monthFormatter.format(new Date(2024, bestMonthIndex, 1)) : '—';

  const currentYearIndex = yearsData.findIndex((entry) => entry.year.toString() === selectedYear);
  const previousYear = currentYearIndex >= 0 ? yearsData[currentYearIndex + 1] : undefined;
  const momentumDelta = previousYear ? yearTotal - previousYear.total : null;
  const momentumPct = previousYear && previousYear.total > 0
    ? (momentumDelta! / previousYear.total) * 100
    : null;

  const heatLevelFor = (count: number) => {
    if (count <= 0 || maxDaily === 0) return 0;
    return Math.min(4, Math.ceil((count / maxDaily) * 4));
  };

  const monthLabels = useMemo(() => {
    if (!selectedYearData) return [] as string[];
    return selectedYearData.weeks.map((week, idx, all) => {
      const dayWithMonth = week.contributionDays.find((day) => day.contributionCount >= 0);
      if (!dayWithMonth) return '';
      const month = monthFormatter.format(new Date(dayWithMonth.date));
      const prevDay = idx > 0 ? all[idx - 1].contributionDays.find((day) => day.contributionCount >= 0) : null;
      if (!prevDay) return month;
      const prevMonth = monthFormatter.format(new Date(prevDay.date));
      return prevMonth === month ? '' : month;
    });
  }, [selectedYearData, monthFormatter]);

  const leastDaily = minCommitDay?.contributionCount ?? 0;
  const maxDailyCount = maxCommitDay?.contributionCount ?? 0;

  return (
    <div className="rounded-3xl border border-white/15 bg-[#050910]/95 px-5 py-5 sm:px-7 sm:py-6 shadow-[0_30px_80px_rgba(2,4,27,0.8)] backdrop-blur">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.45em] text-emerald-300/70">GitHub Proof</p>
          <p className="text-sm font-medium text-muted-foreground">@{username}</p>
        </div>
        <div className="flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
          <span className="rounded-full border border-white/10 px-3 py-1 text-white/80">
            {yearTotal.toLocaleString()} contributions in {selectedYear || '—'}
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1 text-white/80">
            {yearDays.length} tracked days
          </span>
        </div>
        <button
          type="button"
          onClick={onViewWork}
          className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-400/60 bg-emerald-400/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.4em] text-emerald-200"
        >
          View work
        </button>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(0,0.35fr)]">
        <div className="relative rounded-2xl border border-white/10 bg-[#040b16] p-4 max-md:hidden">
          {error && (
            <p className="text-xs text-red-300">{error}</p>
          )}
          {isLoading && !error && (
            <p className="text-xs text-muted-foreground">Fetching contributions…</p>
          )}
          {!isLoading && !error && selectedYearData && (
            <>
              <div className="flex gap-4">
                <div className="flex flex-col text-[11px] text-muted-foreground gap-2 pt-6">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                </div>
                <div className="flex-1 overflow-x-auto">
                  <div className="flex text-[10px] text-muted-foreground gap-[3px] pl-2">
                    {monthLabels.map((label, idx) => (
                      <span key={idx} className="w-4 text-left">
                        {label}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-[3px]">
                    {selectedYearData.weeks.map((week, weekIdx) => (
                      <div key={weekIdx} className="grid grid-rows-7 gap-[3px]">
                        {week.contributionDays.map((day, dayIdx) => (
                          <div
                            key={day.date}
                            className="h-3 w-3 rounded-[3px]"
                            style={{ backgroundColor: heatColors[heatLevelFor(day.contributionCount)] }}
                            title={`${day.contributionCount} contributions on ${new Date(day.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-muted-foreground/80">
                    <span className="flex items-center gap-1">
                      Less <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: heatColors[0] }} />
                    </span>
                    {heatColors.slice(1).map((color, idx) => (
                      <span key={color} className="flex items-center gap-1">
                        <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: color }} />
                        {idx === heatColors.length - 2 ? 'More' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {yearsData.map((entry) => (
            <button
              key={entry.year}
              type="button"
              className={`rounded-2xl border px-3 py-2 text-left transition ${
                entry.year.toString() === selectedYear
                  ? 'border-emerald-400 bg-emerald-400/10 text-white'
                  : 'border-white/10 text-muted-foreground hover:border-white/30'
              }`}
              onClick={() => setSelectedYear(entry.year.toString())}
            >
              <p className="text-sm font-semibold">{entry.year}</p>
              <p className="text-xs uppercase tracking-[0.35em]">
                {entry.total.toLocaleString()} commits
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5/10 p-4">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Best month</p>
          <p className="mt-2 text-2xl font-semibold text-white">{bestMonthLabel} {selectedYear}</p>
          <p className="text-xs text-emerald-300">
            {bestMonthIndex >= 0 ? `${monthlyTotals[bestMonthIndex].toLocaleString()} commits` : '—'}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5/10 p-4">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Least commits in a day</p>
          <p className="mt-2 text-2xl font-semibold text-white">{leastDaily}</p>
          <p className="text-xs text-emerald-300">
            {minCommitDay
              ? new Date(minCommitDay.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
              : '—'}
            {minCommitDay ? `, ${new Date(minCommitDay.date).getFullYear()}` : ''}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5/10 p-4">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Max commits in a day</p>
          <p className="mt-2 text-2xl font-semibold text-white">{maxDailyCount}</p>
          <p className="text-xs text-emerald-300">
            {maxCommitDay
              ? new Date(maxCommitDay.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
              : '—'}
            {maxCommitDay ? `, ${new Date(maxCommitDay.date).getFullYear()}` : ''}
          </p>
        </div>
      </div>
    </div>
  );
};
