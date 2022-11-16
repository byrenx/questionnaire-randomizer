import { Question, QuestionnaireGeneratorConfig } from "../classes";
import { sampleSize } from "lodash";

export const generateQuestionnaireSets = (
  questions: Question[],
  config: QuestionnaireGeneratorConfig
) => {
  // initialize output
  // generate grouping of questions by diffulty
  const generateQuestionDiffultyMap = () => {
    let questionsMapping: { [key: string]: Question[] } = {};
    for (const question of questions) {
      if (!questionsMapping[question.difficulty])
        questionsMapping[question.difficulty] = [question];
      else questionsMapping[question.difficulty].push(question);
    }

    return questionsMapping;
  };

  const generateSingleSet = () => {
    const questionnairesMap = generateQuestionDiffultyMap();
    let questionnaires: Question[] = [];
    const { distribution } = config;
    for (const key in distribution) {
      const items = distribution[key];
      const randomQuestions = sampleSize(questionnairesMap[key], items);
      questionnaires.push(...randomQuestions);
    }
    return questionnaires;
  };

  let questionnaireSets: { [key: string]: Question[] } = {};
  let setKey: number = 65; //A
  // iterate per set
  const { sets } = config;
  for (let index = 0; index < sets; index++) {
    const key = String.fromCharCode(setKey);

    questionnaireSets[key] = generateSingleSet();
    setKey += 1;
  }

  return questionnaireSets;
};