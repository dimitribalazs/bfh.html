export class UserBeerRating {
  user: string;
  beer: string;
  rating: Rating
}


export enum Rating {
  Bad = 0,
  Ok = 1,
  Great = 2
}
