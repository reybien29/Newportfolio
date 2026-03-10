import { NowPlaying } from '@/types';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function AudioPlayer({ track }: { track: NowPlaying }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const hasUnmutedRef = useRef(false);

    // Unmute and start playing on first user interaction
    const handleFirstInteraction = useCallback(() => {
        const audio = audioRef.current;
        if (!audio || hasUnmutedRef.current) return;

        hasUnmutedRef.current = true;
        audio.muted = false;

        // If audio was paused (autoplay completely blocked), start it
        if (audio.paused) {
            audio.play().then(() => setIsPlaying(true)).catch(() => {});
        } else {
            setIsPlaying(true);
        }
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Strategy 1: Try normal autoplay (unmuted)
        audio.muted = false;
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    // Autoplay with sound succeeded (e.g. user has interacted before)
                    hasUnmutedRef.current = true;
                    setIsPlaying(true);
                })
                .catch(() => {
                    // Strategy 2: Autoplay muted (browsers always allow this)
                    audio.muted = true;
                    audio.play()
                        .then(() => {
                            setIsPlaying(true);
                            // Listen for first user interaction to unmute
                            const events = ['click', 'scroll', 'keydown', 'touchstart', 'mousemove'] as const;
                            const unmute = () => {
                                handleFirstInteraction();
                                events.forEach((e) => document.removeEventListener(e, unmute));
                            };
                            events.forEach((e) => document.addEventListener(e, unmute, { once: false, passive: true }));
                        })
                        .catch(() => {
                            // Both strategies failed — wait for manual play
                            setIsPlaying(false);
                        });
                });
        }

        return () => {
            audio.pause();
        };
    }, [handleFirstInteraction]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        // Ensure unmuted on any manual toggle
        if (!hasUnmutedRef.current) {
            hasUnmutedRef.current = true;
            audio.muted = false;
        }

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play().then(() => setIsPlaying(true)).catch(() => {});
        }
    };

    return (
        <div className="glass-inner flex items-center gap-4 rounded-[1.5rem] p-3 pr-5">
            <audio ref={audioRef} src={track.audioSrc} loop preload="auto" />

            {/* Album Cover */}
            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl shadow-lg">
                <img
                    src={track.coverImage}
                    alt={`${track.album} album cover`}
                    className={`h-full w-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100'}`}
                />
                {isPlaying && (
                    <div className="absolute inset-0 rounded-xl ring-1 ring-[color:var(--accent)]/30" />
                )}
            </div>

            {/* Track Info */}
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-[color:var(--text-strong)]">
                    {track.title}
                </p>
                <p className="truncate text-xs text-[color:var(--text-muted)]">
                    {track.artist}
                </p>
            </div>

            {/* Play / Pause Button */}
            <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[color:var(--border-glass)] bg-[color:var(--surface-strong)] text-[color:var(--text-strong)] transition-all duration-300 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] hover:shadow-[0_0_16px_rgba(220,38,38,0.15)] active:scale-95"
            >
                {isPlaying ? (
                    /* Pause Icon */
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            fillRule="evenodd"
                            d="M6.75 5.25a.75.75 0 0 1 .75.75v12a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm10.5 0a.75.75 0 0 1 .75.75v12a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Z"
                            clipRule="evenodd"
                        />
                    </svg>
                ) : (
                    /* Play Icon */
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                            clipRule="evenodd"
                        />
                    </svg>
                )}
            </button>
        </div>
    );
}
