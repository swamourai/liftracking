import { BottomSheet } from '@/components/ui/BottomSheet'
import { Button } from '@/components/ui/Button'

interface Props {
  onConfirm: () => void

  onClose: () => void
}

export function DeleteProfileModal({
  onConfirm,
  onClose,
}: Props) {
  return (
    <BottomSheet onClose={onClose} className="p-5 pb-10">
      <h2 className="text-2xl font-bold text-(--color-text)">Supprimer le compte</h2>

      <p className="mt-2 leading-relaxed text-(--color-text-muted)">
        Cela supprimera tes données de profil sur cet appareil.
      </p>

      <div className="mt-8 space-y-3">
        <Button type="button" variant="danger" fullWidth onClick={onConfirm}>
          Supprimer le compte
        </Button>

        <Button type="button" variant="secondary" fullWidth onClick={onClose}>
          Annuler
        </Button>
      </div>
    </BottomSheet>
  )
}
