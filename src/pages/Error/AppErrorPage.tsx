import {
  isRouteErrorResponse,
  Link,
  useRouteError,
} from 'react-router-dom'

function getErrorMessage(error: unknown) {
  if (isRouteErrorResponse(error)) {
    return `${error.status} ${error.statusText}`
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Une erreur inattendue est survenue.'
}

export function AppErrorPage() {
  const error = useRouteError()

  return (
    <main className="min-h-screen bg-(--color-bg) px-5 py-10 text-(--color-text)">
      <div className="mx-auto max-w-md rounded-4xl bg-(--color-surface) p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-(--color-text-muted)">Erreur</p>
        <h1 className="mt-2 text-xl font-bold">Oups, quelque chose s'est mal passé</h1>
        <p className="mt-3 text-sm text-(--color-text-muted)">{getErrorMessage(error)}</p>

        <div className="mt-6 flex gap-3">
          <Link
            to="/"
            className="inline-flex h-12 flex-1 items-center justify-center rounded-2xl bg-(--color-primary) px-4 text-sm font-semibold text-white"
          >
            Retour à l'accueil
          </Link>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex h-12 flex-1 items-center justify-center rounded-2xl bg-(--color-surface-muted) px-4 text-sm font-semibold text-(--color-text)"
          >
            Recharger
          </button>
        </div>
      </div>
    </main>
  )
}
