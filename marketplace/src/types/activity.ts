import { Event } from ".";

export interface Activity {
    id: number;

    event: Event;

    value: number;

    time: Date;

    account_id: string;

    opposite_user_id: string; 

    hero_id: number;
}