export function calculateReadingSpeed(sentence: string, wpm: number) {
  const wordCount:number = sentence.split(/\s+/).length;
  const minutes:number = wordCount/ wpm;
  const seconds:number = minutes * 60;
  return { wordCount,
     minutes: Number(minutes.toFixed(2)), 
     seconds: Number(seconds.toFixed(2)) };
}