import { NavigatorButton } from "./NavigatorButton";
import { CommandPanel } from "./CommandPanel";
import { useNavigator } from "./useNavigator";

export function HydrAINavigator() {
  const {
    state,
    open,
    close,
    selectMission,
    setBusiness,
    setChannel,
    setUrgency,
    goToLeadCapture,
    skipLeadCapture,
    saveLead,
    handleDiscordClick,
  } = useNavigator();

  return (
    <>
      {/* Floating Button - only show when panel is closed */}
      {!state.isOpen && <NavigatorButton onClick={open} />}

      {/* Command Panel */}
      <CommandPanel
        state={state}
        onClose={close}
        onSelectMission={selectMission}
        onSetBusiness={setBusiness}
        onSetChannel={setChannel}
        onSetUrgency={setUrgency}
        onGoToLeadCapture={goToLeadCapture}
        onSkipLeadCapture={skipLeadCapture}
        onSaveLead={saveLead}
        onDiscordClick={handleDiscordClick}
      />
    </>
  );
}
