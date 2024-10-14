"use client";

import { History } from "lucide-react";

type ArchiveModalProps = {
  items: any[];
  setModal: any;
  modal: boolean;
};

function ArchiveModal({ items, setModal, modal }: ArchiveModalProps) {
  return (
    <div
      className="fixed h-screen w-screen bg-transparent flex flex-col justify-center items-center z-10"
      onClick={(e) => {
        e.stopPropagation();
        setModal(!modal);
      }}
    >
      <div
        className="z-20 bg-opacity-10 bg-background rounded-3xl divide-y divide-secondary w-[calc(80vw)] lg:w-[40vw] h-[90vh] flex flex-col px-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-foreground font-mono text-3xl my-10 mx-5">
          Archive <History className="size-[1.875rem] inline"></History>
        </div>
        <div className="Archivewrapper"></div>
      </div>
    </div>
  );
}

export { ArchiveModal };
