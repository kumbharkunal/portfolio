import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';

const GitHubGraph = () => {
    const [selectedYear, setSelectedYear] = useState(2025);
    const [isLoading, setIsLoading] = useState(true);
    const [isYearChanging, setIsYearChanging] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [retryCount, setRetryCount] = useState(0);
    const [key, setKey] = useState(0); // Force re-render of GitHubCalendar
    const years = [2024, 2025];
    const MAX_RETRIES = 3;

    // Custom theme using CSS variables for instant switching
    const themeVars = [
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

    // Fetch data with retry logic
    const fetchGitHubData = async (attempt = 1) => {
        try {
            setIsLoading(true);
            setError(null);

            // Test if GitHub API is accessible by making a simple fetch
            const response = await fetch(`https://api.github.com/users/kumbharkunal`);

            if (!response.ok) {
                throw new Error('Failed to fetch GitHub data');
            }

            // If successful, mark as loaded
            setIsLoading(false);
            setRetryCount(0);
        } catch (err) {
            console.error(`Attempt ${attempt} failed:`, err);

            if (attempt < MAX_RETRIES) {
                // Retry after a delay (exponential backoff)
                const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
                console.log(`Retrying in ${delay}ms...`);

                setTimeout(() => {
                    setRetryCount(attempt);
                    fetchGitHubData(attempt + 1);
                }, delay);
            } else {
                // All retries failed
                setError('Failed to load GitHub contributions. Please try again.');
                setIsLoading(false);
                setRetryCount(attempt);
            }
        }
    };

    // Handle manual refresh
    const handleRefresh = () => {
        setKey(prev => prev + 1); // Force re-render
        setRetryCount(0);
        fetchGitHubData(1);
    };

    // Handle year change with loading state
    const handleYearChange = (year: number) => {
        if (year !== selectedYear) {
            setIsYearChanging(true);
            setSelectedYear(year);

            // Show loading for a brief moment while GitHubCalendar fetches new data
            setTimeout(() => {
                setIsYearChanging(false);
            }, 800);
        }
    };

    // Initial data fetch
    useEffect(() => {
        fetchGitHubData(1);
    }, []);

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
                                className={`px-6 py-2 rounded-full font-medium transition-all ${selectedYear === year
                                    ? 'bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-white shadow-lg'
                                    : 'glass-card hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
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
                    {/* Loading State */}
                    {(isLoading || isYearChanging) && (
                        <div className="flex flex-col items-center justify-center py-12 gap-4">
                            <div className="w-12 h-12 border-4 border-light-primary/20 dark:border-dark-primary/20 border-t-light-primary dark:border-t-dark-primary rounded-full animate-spin" />
                            <p className="text-light-subtle-text dark:text-dark-subtle-text">
                                {retryCount > 0 ? `Retrying... (Attempt ${retryCount}/${MAX_RETRIES})` : 'Loading contributions...'}
                            </p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && !isLoading && (
                        <div className="flex flex-col items-center justify-center py-12 gap-4">
                            <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-light-subtle-text dark:text-dark-subtle-text text-center max-w-md">
                                {error}
                            </p>
                            <motion.button
                                onClick={handleRefresh}
                                className="btn-primary flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span>Retry</span>
                            </motion.button>
                        </div>
                    )}

                    {/* GitHub Calendar */}
                    {!isLoading && !error && !isYearChanging && (
                        <div className="flex justify-center overflow-x-auto">
                            <GitHubCalendar
                                key={key}
                                username="kumbharkunal"
                                year={selectedYear}
                                blockSize={12}
                                blockMargin={4}
                                fontSize={14}
                                theme={explicitTheme}
                                colorScheme="light"
                                errorMessage="Unable to load contribution data"
                            />
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default GitHubGraph;
