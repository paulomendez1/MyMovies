export interface ActorDTO {
    id : number;
    name : string;
    birthdate : Date;
    biography : string;
    picture : File;
}

export interface ActorMovieDTO {
    id : number;
    name : string;
    character : string;
    picture : string;
}