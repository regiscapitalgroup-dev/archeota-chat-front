import { ClassifierModel } from "../pages/users/models/ClassifierModel";

export const getClassifierData = (id: number, classifiers: ClassifierModel[]) => {
    return classifiers.find(c => c.id === id);
}