'use client';

import { memo, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaStar, FaUsers, FaThumbsUp, FaHeadset } from 'react-icons/fa';
import clsx from 'clsx';

type IconKey = 'star' | 'users' | 'thumbs' | 'headset';

const statIcons = {
  star: FaStar,
  users: FaUsers,
  thumbs: FaThumbsUp,
  headset: FaHeadset,
} as const;

interface Stat {
  number: number | string; // AU-formatted if number
  label: string;
  icon?: IconKey | React.ComponentType<{ className?: string }>;
}

interface StatsSectionProps {
  stats: Stat[];
  title?: string;
  description?: string;
  className?: string;
}

/** Motion variants (honour reduced motion) */
const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const cardVariants = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
});

function formatValue(value: number | string) {
  if (typeof value === 'number') {
    return new Intl.NumberFormat('en-AU', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  }
  return value;
}

function resolveIcon(icon?: Stat['icon']) {
  if (!icon) return FaStar;
  if (typeof icon === 'string') return statIcons[icon as IconKey] ?? FaStar;
  return icon;
}

function StatsSectionBase({
  stats,
  title = 'Why Australians Trust Helpi',
  description = 'Our numbers speak for themselves',
  className,
}: StatsSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const safeStats = useMemo(
    () =>
      (stats ?? []).filter(
        (s) => s && (s.number !== undefined && s.number !== null) && s.label
      ),
    [stats]
  );

  const gridClass = useMemo(() => {
    const count = safeStats.length;
    return clsx(
      // Center the grid block within container + center items in each cell
      'grid justify-center justify-items-center gap-4 sm:gap-6 lg:gap-8',
      // Auto layout by count
      count < 4
        ? 'grid-cols-1 sm:grid-cols-2' // 1–3 items → centered
        : 'grid-cols-2 md:grid-cols-4' // 4+ items → standard layout
    );
  }, [safeStats.length]);

  return (
    <section
      className={clsx('py-16 md:py-20 px-4 bg-gray-50', className)}
      aria-labelledby="stats-title"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="text-center mb-10 md:mb-14">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={
              shouldReduceMotion
                ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
                : containerVariants
            }
          >
            <h2
              id="stats-title"
              className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900"
            >
              {title}
            </h2>
            {description ? (
              <p className="mt-3 text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {description}
              </p>
            ) : null}
          </motion.div>
        </header>

        {/* Body */}
        <div>
          {safeStats.length === 0 ? (
            <div
              role="status"
              className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-600"
            >
              No stats to display.
            </div>
          ) : (
            <ul className={gridClass} aria-label="Helpi key statistics">
              {safeStats.map((stat, idx) => {
                const Icon = resolveIcon(stat.icon);
                return (
                  <motion.li
                    key={`${stat.label}-${idx}`}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={
                      shouldReduceMotion
                        ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
                        : cardVariants(idx * 0.06)
                    }
                    className="w-full group"
                    role="listitem"
                  >
                    <article className="bg-white rounded-2xl p-5 sm:p-6 lg:p-8 border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg focus-within:shadow-lg outline-none">
                      {/* Icon */}
                      <div
                        className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-purple-50 text-[#511076] mb-3 sm:mb-4 ring-1 ring-purple-100 mx-auto"
                        aria-hidden="true"
                      >
                        <Icon className="text-xl sm:text-2xl" />
                      </div>

                      {/* Value */}
                      <p className="text-center text-[#511076] font-extrabold leading-none">
                        <span className="text-xl sm:text-2xl lg:text-3xl">
                          {formatValue(stat.number)}
                        </span>
                      </p>

                      {/* Label */}
                      <p className="mt-2 text-center text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed font-medium">
                        {stat.label}
                      </p>

                      {/* SR label for clarity */}
                      <span className="sr-only">Statistic: {stat.label}</span>
                    </article>
                  </motion.li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

const StatsSection = memo(StatsSectionBase);
export default StatsSection;




// 'use client';

// import { motion } from 'framer-motion';
// import { FaStar, FaUsers, FaThumbsUp, FaHeadset } from 'react-icons/fa';

// interface Stat {
//     number: string;
//     label: string;
//     icon?: string;
// }

// interface StatsSectionProps {
//     stats: Stat[];
// }

// // Icon mapping for stats
// const statIcons = {
//     star: FaStar,
//     users: FaUsers,
//     thumbs: FaThumbsUp,
//     headset: FaHeadset,
// };

// export default function StatsSection({ stats }: StatsSectionProps) {
//     return (
//         <section className='py-20 px-4 bg-gray-50'>
//             <div className='max-w-7xl mx-auto'>
//                 <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8 }}
//                     viewport={{ once: true }}
//                     className='text-center mb-16'>
//                     <h2 className='text-xl md:text-2xl font-bold text-gray-900 mb-4'>
//                         Why Australians Trust Helpi
//                     </h2>
//                     <p className='text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed'>
//                         Our numbers speak for themselves
//                     </p>
//                 </motion.div>

//                 <div className='grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8'>
//                     {stats.map((stat, idx) => {
//                         const IconComponent = stat.icon
//                             ? statIcons[stat.icon as keyof typeof statIcons]
//                             : FaStar;
//                         return (
//                             <motion.div
//                                 key={stat.label}
//                                 initial={{ opacity: 0, y: 30 }}
//                                 whileInView={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.7, delay: idx * 0.1 }}
//                                 viewport={{ once: true }}
//                                 className='bg-white rounded-2xl p-6 lg:p-8 flex flex-col items-center border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1'
//                                 aria-label={stat.label}>
//                                 {/* Icon */}
//                                 <div className='w-12 h-12 flex items-center justify-center rounded-full bg-purple-50 text-[#511076] mb-4'>
//                                     {IconComponent && (
//                                         <IconComponent className='text-xl' />
//                                     )}
//                                 </div>

//                                 <span className='text-xl md:text-2xl lg:text-2xl font-bold text-[#511076] mb-3 leading-tight'>
//                                     {stat.number}
//                                 </span>
//                                 <span className='text-sm md:text-base lg:text-lg text-gray-700 text-center leading-relaxed font-medium'>
//                                     {stat.label}
//                                 </span>
//                             </motion.div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </section>
//     );
// }
