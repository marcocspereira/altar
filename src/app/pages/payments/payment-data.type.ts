import { Matrix } from '../../shared/matrix/matrix';

export type PaymentData = {
  name: string;
  amount: number;
  code: string;
  matrix: Matrix;
};
