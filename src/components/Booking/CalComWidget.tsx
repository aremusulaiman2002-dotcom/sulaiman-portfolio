// src/components/Booking/CalComWidget.tsx
'use client';

interface CalComWidgetProps {
  calLink: string; // 'sulaiman-aremu'
}

const CalComWidget = ({ calLink }: CalComWidgetProps) => {
  return (
    <div className="w-full h-[700px] rounded-2xl overflow-hidden border border-cyan-500/30">
      <iframe
        src={`https://cal.com/${calLink}?theme=dark&brandColor=06b6d4`}
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="yes"
        className="rounded-2xl"
        title="Booking Calendar"
        loading="lazy"
      />
    </div>
  );
};

export default CalComWidget;