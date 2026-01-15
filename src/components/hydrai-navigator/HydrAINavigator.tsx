import { NavigatorButton } from "./NavigatorButton";
import { CommandPanel } from "./CommandPanel";
import { useNavigator } from "./useNavigator";
import { useNavigatorSfx } from "./sfx";

export function HydrAINavigator() {
  const sfx = useNavigatorSfx();

  const {
    state,
    isAILoading,
    open,
    close,
    selectMission,
    startFreeChat,
    sendChatMessage,
    setBusiness,
    setChannel,
    setUrgency,
    goToLeadCapture,
    skipLeadCapture,
    saveLead,
    handleDiscordClick,
  } = useNavigator();

  const handleOpen = () => {
    sfx.click();
    open();
  };

  const handleClose = () => {
    sfx.click();
    close();
  };

  const handleDiscordClickWithSfx = () => {
    sfx.click();
    handleDiscordClick();
  };

  return (
    <>
      {/* Floating Button - only show when panel is closed */}
      {!state.isOpen && <NavigatorButton onClick={handleOpen} sfx={sfx} />}

      {/* Command Panel */}
      <CommandPanel
        state={state}
        sfx={sfx}
        isAILoading={isAILoading}
        onClose={handleClose}
        onSelectMission={selectMission}
        onStartFreeChat={startFreeChat}
        onSendChatMessage={sendChatMessage}
        onSetBusiness={setBusiness}
        onSetChannel={setChannel}
        onSetUrgency={setUrgency}
        onGoToLeadCapture={goToLeadCapture}
        onSkipLeadCapture={skipLeadCapture}
        onSaveLead={saveLead}
        onDiscordClick={handleDiscordClickWithSfx}
      />
    </>
  );
}
