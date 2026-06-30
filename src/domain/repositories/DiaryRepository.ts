import { Diary } from '../entities/Diary.ts';

export interface DiaryRepository {
    save(diary: Diary): Promise<Diary>;
}