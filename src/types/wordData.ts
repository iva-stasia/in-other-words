export interface WordOption {
  word: string;
  source: "apiDictionary" | "ownDictionary" | "custom";
}

export interface WordDefinition {
  inputValue?: string;
  definition: string;
  partOfSpeech?: string;
  examples?: string[];
  synonyms?: string[];
}

export interface WordApiResult {
  results: WordDefinition[];
  pronunciation?: { all?: string };
}

export interface WordAudioResult {
  hwi?: { prs?: { sound: { audio: string } }[] };
}

export interface WordApiData {
  definitions: WordDefinition[];
  pronunciation?: string;
  audioURL?: string;
}

export interface Word
  extends Omit<WordDefinition, "inputValue">,
    Omit<WordApiData, "definitions"> {
  word: string;
  set: string;
  progress: number;
}

export type WordGridData = Omit<Word, 'partOfSpeech' | 'examples' | 'synonyms'>;
