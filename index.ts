// Build a Mortgage Claculator using Rxjs and calculateMortgage method
import { fromEvent, combineLatest, of, Observable } from 'rxjs';
import { map, filter, startWith } from 'rxjs/operators';

import { calculateMortgage } from './calculate';

const loanLengthInput = (document.getElementById(
  'loanLength'
) as HTMLInputElement).value;

const selectValue = (ev: Event) => (ev.target as HTMLInputElement).value;
const loan = fromEvent(document.getElementById('loanAmount'), 'input').pipe(
  map(selectValue),
  filter(Boolean),
  map(Number.parseFloat)
);
const interest = fromEvent(
  document.getElementById('loanInterest'),
  'input'
).pipe(
  map(selectValue),
  filter(Boolean),
  map(Number.parseFloat)
);
const years = fromEvent(document.getElementById('loanLength'), 'input').pipe(
  map(selectValue),
  startWith(loanLengthInput),
  map(Number.parseInt)
);

const answer = combineLatest([interest, loan, years]).pipe(
  map(([interest, loan, years]) => {
    return { answer: calculateMortgage(interest, loan, years) };
  })
);

const result = document.getElementById('result');
answer.subscribe(({ answer }) => {
  console.log({ answer });
  result.textContent = String(answer!);
});
