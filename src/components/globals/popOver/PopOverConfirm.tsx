import {
  FloatingPanelContent,
  FloatingPanelForm,
  FloatingPanelRoot,
  FloatingPanelTrigger,
  FloatingPanelLabel,
  FloatingPanelTextarea,
  FloatingPanelFooter,
  FloatingPanelCloseButton,
  FloatingPanelSubmitButton,
} from '@/components/CultUI/FloatingPanel'
import Button from '@/components/CultUI/Button'
import Image from 'next/image'

export default function FloatingPanelDemo() {
  const handleSubmit = (note: string) => {
    console.log('Submitted note:', note)
  }

  return (
    <div className="p-8">
      <FloatingPanelRoot>
        <FloatingPanelTrigger title="Mantapp">
          Add Note
        </FloatingPanelTrigger>
        <FloatingPanelContent className="w-[calc(100%-60%)]">
          <div className="flex p-5 w-full gap-2">
            <Button intent="success">
              <span className="font-bold">{'Yes'}</span>
            </Button>
            <Button intent="default">
              <span className="font-bold">{'No'}</span>
            </Button>
          </div>
        </FloatingPanelContent>
      </FloatingPanelRoot>
    </div>
  )
}
