exportCal.onclick = () => {
  const entries = storeGet();
  if (!entries.length) return alert('No entries');

  const esc = s => s.replace(/([,;])/g,'\\$1').replace(/\n/g,'\\n');
  const now = new Date().toISOString().replace(/[-:]/g,'').split('.')[0];

  let ics = 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Police OT//EN\r\n';

  entries.forEach((e, i) => {
    const d = new Date(e.date).toISOString().replace(/[-:]/g,'').split('.')[0];

    ics +=
`BEGIN:VEVENT\r
UID:police-ot-${i}-${d}@local\r
DTSTAMP:${now}Z\r
DTSTART:${d}Z\r
SUMMARY:${esc(`Police OT ${e.hours}h`)}\r
END:VEVENT\r
`;
  });

  ics += 'END:VCALENDAR';

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'police-ot.ics';
  a.click();
  URL.revokeObjectURL(a.href);
};

exportPdf.onclick = () => alert('PDF layout coming next drop');
