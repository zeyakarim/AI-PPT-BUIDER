import { ContentArea } from "./components/ContentArea";

export const MainContent = () => {
  return (
    <div className="box-border caret-transparent flex basis-[0%] flex-col grow overflow-hidden">
      <div className="relative box-border caret-transparent flex basis-[0%] grow z-0 overflow-hidden">
        <ContentArea />
      </div>
    </div>
  );
};
