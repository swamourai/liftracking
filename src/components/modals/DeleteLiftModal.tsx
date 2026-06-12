import { BottomSheet } from '@/components/ui/BottomSheet'
import { Button } from '../ui/Button'

interface Props {
  onConfirm: () => void

  onClose: () => void
}

export function DeleteLiftModal({
  onConfirm,
  onClose,
}: Props) {
  return (
    <BottomSheet
      onClose={onClose}
      className="p-5 pb-10"
    >
      <h2
        className="text-2xl font-bold text-[#111827]"
      >
        Supprimer le lift
      </h2>

      <p
        className="mt-2 leading-relaxed text-[#6B7280]"
      >
        Cette action est irréversible.
      </p>

      <div className="mt-8 space-y-3">
        <Button
          type="button"
          variant="danger"
          fullWidth
          onClick={onConfirm}
        >
          Supprimer le lift
        </Button>
        <Button
          type="button"
          variant="secondary"
          fullWidth
          onClick={onClose}
        >
          Annuler
        </Button>
      </div>
    </BottomSheet>
  )
}
