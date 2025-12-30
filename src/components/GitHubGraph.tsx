import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { motion } from 'framer-motion';
import { ActivityCalendar } from 'react-activity-calendar';

// Types for GitHub contribution data
interface ContributionDay {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
}

interface CachedData {
    data: ContributionDay[];
    fetchedAt: number;
}

// Cache for storing fetched data per year (persists across re-renders)
const dataCache = new Map<number, CachedData>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// API endpoint for GitHub contributions (same as react-github-calendar uses)
const fetchContributions = async (username: string, year: number): Promise<ContributionDay[]> => {
    const response = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch GitHub contributions');
    }

    const data = await response.json();
    return data.contributions;
};

// Loading skeleton with shimmer wave animation
const CalendarSkeleton = memo(() => (
    <div className="relative overflow-hidden">
        {/* Shimmer overlay - different colors for light/dark mode */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-black/5 dark:via-white/10 to-transparent" />

        <div className="flex flex-col gap-2">
            {/* Month labels skeleton */}
            <div className="flex gap-[40px] mb-2 ml-8">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((_, i) => (
                    <div key={i} className="w-8 h-3 rounded bg-gray-300 dark:bg-gray-700" />
                ))}
            </div>

            {/* Calendar grid */}
            <div className="flex gap-[3px]">
                {/* Day labels */}
                <div className="flex flex-col gap-[3px] mr-2 w-8">
                    {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((day, i) => (
                        <div key={i} className="h-[12px] flex items-center justify-end pr-1">
                            <span className="text-[10px] text-light-subtle-text/50 dark:text-dark-subtle-text/40">{day}</span>
                        </div>
                    ))}
                </div>

                {/* Weeks grid */}
                {Array.from({ length: 52 }).map((_, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-[3px]">
                        {Array.from({ length: 7 }).map((_, dayIndex) => (
                            <div
                                key={dayIndex}
                                className="w-[12px] h-[12px] rounded-sm bg-gray-200 dark:bg-gray-700"
                            />
                        ))}
                    </div>
                ))}
            </div>

            {/* Legend skeleton */}
            <div className="flex items-center justify-end gap-2 mt-4 opacity-60">
                <span className="text-xs text-light-subtle-text dark:text-dark-subtle-text">Less</span>
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="w-[10px] h-[10px] rounded-sm bg-gray-200 dark:bg-gray-700" style={{ opacity: 0.3 + i * 0.15 }} />
                ))}
                <span className="text-xs text-light-subtle-text dark:text-dark-subtle-text">More</span>
            </div>
        </div>
    </div>
));

CalendarSkeleton.displayName = 'CalendarSkeleton';

const GitHubGraph = () => {
    const [selectedYear, setSelectedYear] = useState(2025);
    const [contributions, setContributions] = useState<ContributionDay[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const mountedRef = useRef(true);
    const years = [2024, 2025];

    // Custom theme using CSS variables for instant switching
    const themeVars: [string, string, string, string, string] = [
        'var(--github-level-0)',
        'var(--github-level-1)',
        'var(--github-level-2)',
        'var(--github-level-3)',
        'var(--github-level-4)',
    ];

    const explicitTheme = {
        light: themeVars,
        dark: themeVars,
    };

    // Fetch data with caching
    const fetchData = useCallback(async (year: number, forceRefresh = false) => {
        // Check cache first (unless forcing refresh)
        if (!forceRefresh) {
            const cached = dataCache.get(year);
            if (cached && Date.now() - cached.fetchedAt < CACHE_DURATION) {
                setContributions(cached.data);
                setIsLoading(false);
                setError(null);
                return;
            }
        }

        setIsLoading(true);
        setError(null);

        try {
            const data = await fetchContributions('kumbharkunal', year);

            if (!mountedRef.current) return;

            // Cache the data
            dataCache.set(year, {
                data,
                fetchedAt: Date.now(),
            });

            setContributions(data);
            setIsLoading(false);
        } catch (err) {
            if (!mountedRef.current) return;

            console.error('Failed to fetch GitHub contributions:', err);
            setError('Failed to load contribution data');
            setIsLoading(false);
        }
    }, []);

    // Handle year change - use cache if available
    const handleYearChange = useCallback((year: number) => {
        if (year === selectedYear) return;

        setSelectedYear(year);

        // Check if we have cached data for this year
        const cached = dataCache.get(year);
        if (cached && Date.now() - cached.fetchedAt < CACHE_DURATION) {
            // Use cached data immediately - no loading state
            setContributions(cached.data);
            setError(null);
        } else {
            // Need to fetch - show loading
            fetchData(year);
        }
    }, [selectedYear, fetchData]);

    // Handle refresh button click
    const handleRefresh = useCallback(() => {
        fetchData(selectedYear, true);
    }, [selectedYear, fetchData]);

    // Initial fetch
    useEffect(() => {
        mountedRef.current = true;
        fetchData(selectedYear);

        return () => {
            mountedRef.current = false;
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <section className="section-padding">
            <div className="container-wide">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-sora font-bold mb-4">
                        <span className="gradient-text">GitHub Contributions</span>
                    </h2>
                    <p className="text-light-subtle-text dark:text-dark-subtle-text text-lg max-w-2xl mx-auto mb-8">
                        My coding activity and open-source contributions
                    </p>

                    {/* Year Toggle */}
                    <div className="flex justify-center gap-4 mb-8">
                        {years.map((year) => (
                            <motion.button
                                key={year}
                                onClick={() => handleYearChange(year)}
                                disabled={isLoading}
                                className={`px-6 py-2 rounded-full font-medium transition-all ${selectedYear === year
                                    ? 'bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-white shadow-lg'
                                    : 'glass-card hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
                                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                whileHover={!isLoading ? { scale: 1.05 } : {}}
                                whileTap={!isLoading ? { scale: 0.95 } : {}}
                            >
                                {year}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="glass-card p-6 md:p-12 rounded-2xl"
                >
                    {/* Loading State - Show skeleton */}
                    {isLoading && (
                        <div className="flex justify-center overflow-x-auto py-4">
                            <CalendarSkeleton />
                        </div>
                    )}

                    {/* Error State with Refresh Button */}
                    {error && !isLoading && (
                        <div className="flex flex-col items-center justify-center py-12 gap-6">
                            <svg className="w-16 h-16 text-red-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-light-subtle-text dark:text-dark-subtle-text text-center max-w-md text-lg">
                                {error}
                            </p>
                            <motion.button
                                onClick={handleRefresh}
                                className="btn-primary min-w-[200px] py-4 px-8 text-lg"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span>Try Again</span>
                            </motion.button>
                        </div>
                    )}

                    {/* GitHub Calendar - Show only when data is loaded */}
                    {!isLoading && !error && contributions && (
                        <div className="flex justify-center overflow-x-auto">
                            <ActivityCalendar
                                data={contributions}
                                blockSize={12}
                                blockMargin={4}
                                fontSize={14}
                                theme={explicitTheme}
                                colorScheme="light"
                                labels={{
                                    totalCount: `{{count}} contributions in ${selectedYear}`,
                                }}
                            />
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default GitHubGraph;
