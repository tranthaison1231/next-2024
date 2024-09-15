'use client'; // Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <h2>{error.name}</h2>
        <button onClick={reset} type="button">
          Try again
        </button>
      </body>
    </html>
  );
}
