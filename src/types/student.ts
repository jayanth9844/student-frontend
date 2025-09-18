export interface Student {
  student_id?: string;
  name: string;
  class?: number;
  comprehension?: number; // floating-point value
  attention: number; // floating-point value
  focus?: number; // floating-point value
  retention?: number; // floating-point value
  assessment_score?: number; // integer value
  engagement_time?: number; // integer value (minutes per day)
  // Legacy fields for backward compatibility
  math?: number;
  science?: number;
  english?: number;
  skill?: number;
  persona?: LearningPersona;
}

export interface LearningPersona {
  type: 'High Achiever' | 'Steady Learner' | 'Needs Support' | 'Inconsistent Performer';
  description: string;
  color: string;
  recommendations: string[];
}

export interface StudentStats {
  totalStudents: number;
  averageMath: number;
  averageScience: number;
  averageEnglish: number;
  averageSkill: number;
  averageAttention: number;
  topPerformer: Student | null;
  lowestPerformer: Student | null;
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

export interface InsightData {
  trends: string[];
  outliers: Student[];
  recommendations: string[];
  correlations: {
    attentionPerformance: number;
    subjectCorrelations: {
      mathScience: number;
      mathEnglish: number;
      scienceEnglish: number;
    };
  };
}
