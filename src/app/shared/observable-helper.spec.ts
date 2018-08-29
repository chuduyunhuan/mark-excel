import { async } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';

import { identity } from 'lodash';

import { Bucket, sleep, deepMap } from './observable-helper';



describe('Observable Helper', () => {

  xdescribe('sleeper', () => {

    it('should fall asleep', async(async () => {

      const holdInSeconds = 2;

      const begin = Date.now() / 1000;
      await sleep(holdInSeconds);
      const end = Date.now() / 1000;

      expect(end - begin).toBeCloseTo(holdInSeconds, 1);
    }));
  });
});


describe('Observable Helper', () => {

  let bucket: Bucket;
  const obs = Observable.range(1, 65535);


  beforeEach(() => {
    if (bucket) {
      bucket.release();
    }

    bucket = new Bucket();
  });


  describe('subscription Bucket', () => {

    it('should be created', () => {
      expect(bucket).toBeTruthy();
    });


    it('should adds subscription', () => {
      let num = 0;

      bucket
        .add(
          Observable.of(42).subscribe(n => num += n),
          obs.take(3).subscribe(n => num += n),
        )
        .add(
          obs.take(3).subscribe(n => num -= n),
        )
      ;

      expect(num).toEqual(42 + 1 + 2 + 3 - 1 - 2 - 3);
    });


    it('should releases subscription', async(async () => {
      let num = 0;

      bucket.add(
        Observable.interval(500).subscribe(n => num += 1),
      );

      await sleep(2);

      const count = num;

      bucket.release();

      await sleep(2);

      expect(num).toEqual(count);
    }));
  });
});


describe('Observable Helper', () => {

  describe('deepMap', () => {

    it('should map deeply', async(async () => {

      const list = [ 1, 2, 3, 4, 5 ];
      const list$ = Observable.of(list);

      const square = (n: number) => n * n;

      const mapped = list.map(square);
      const mapped$ = list$.let(deepMap(square)).flatMap(identity);

      const same = await Observable
        .from(mapped)
        .sequenceEqual(mapped$)
        .toPromise()
      ;

      expect(same).toEqual(true);
    }));
  });
});

