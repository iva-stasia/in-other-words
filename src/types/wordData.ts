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

export interface Word {
  word: string;
  set: string;
  progress: number;
  audioURL?: string;
  pronunciation?: string;
  definitions: WordDefinition[];
  creationDate: Date;
}
