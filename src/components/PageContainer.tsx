import { SlideEditor } from "./SlideEditor";

export const PageContainer = () => {
  return (
    <div className="box-border caret-transparent mx-auto pt-16 md:pt-0">
      <div className="box-border caret-transparent">
        <SlideEditor />
      </div>
    </div>
  );
};
