'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export const HELPI_VIDEO_SRC = '/videos/helpi.mp4';
export const HELPI_VIDEO_POSTER = '/images/hero-office.jpg';

interface HelpiVideoProps {
    mode?: 'cover' | 'frame';
    autoPlay?: boolean;
    showControl?: boolean;
    className?: string;
    label?: string;
}

export default function HelpiVideo({
    mode = 'frame',
    autoPlay = false,
    showControl = true,
    className = '',
    label = 'Helpi cleaning video',
}: HelpiVideoProps) {
    const reduceMotion = useReducedMotion();
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [userPaused, setUserPaused] = useState(
        reduceMotion === true || !autoPlay
    );
    const [isPlaying, setIsPlaying] = useState(false);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        if (reduceMotion === true) {
            setUserPaused(true);
        }
    }, [reduceMotion]);

    useEffect(() => {
        const node = rootRef.current;
        if (!node) {
            return;
        }
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry) {
                    setInView(entry.isIntersecting);
                }
            },
            { threshold: 0.2 }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) {
            return;
        }
        if (!userPaused && inView) {
            const playAttempt = video.play();
            if (playAttempt !== undefined) {
                playAttempt.catch(() => {
                    setUserPaused(true);
                    setIsPlaying(false);
                });
            }
            return;
        }
        video.pause();
    }, [inView, userPaused]);

    return (
        <div
            ref={rootRef}
            className={`relative overflow-hidden bg-[#1a1024] ${
                mode === 'cover' ? 'h-full w-full' : 'aspect-[16/10] w-full'
            } ${className}`}>
            <video
                ref={videoRef}
                className='h-full w-full object-cover'
                muted
                loop
                playsInline
                preload={autoPlay && reduceMotion !== true ? 'auto' : 'metadata'}
                poster={HELPI_VIDEO_POSTER}
                aria-label={label}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}>
                <source src={HELPI_VIDEO_SRC} type='video/mp4' />
            </video>
            {showControl ? (
                <button
                    type='button'
                    onClick={() => setUserPaused((current) => !current)}
                    className={`absolute z-10 min-h-11 rounded-full bg-white/95 px-4 text-sm font-semibold text-helpi-primary shadow-md ring-1 ring-black/5 focus:outline-none focus-visible:ring-4 focus-visible:ring-helpi-soft ${
                        mode === 'cover' ? 'right-4 top-4' : 'bottom-4 left-4'
                    }`}
                    aria-pressed={isPlaying}>
                    {isPlaying ? 'Pause video' : 'Play video'}
                </button>
            ) : null}
        </div>
    );
}
