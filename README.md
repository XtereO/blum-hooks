<div align="center">
    <img src="https://drive.google.com/uc?export=view&id=14_MxI0TSoz8wK9e-f8BHzworUfehaZz3"/>
</div>

# Description

This library contains base hooks. Created for fast developing vk-mini-apps. I recomend use it with [@blumjs/cli](https://www.npmjs.com/package/@blumjs/cli).

## Usage

```
import { useCallback, useEffect } from "react";
import {
    useConsoleLog,
    useDebouncing,
    useEventListener,
    useIntersectionObserver,
    useInterval,
    useTimeout
} from '@blumjs/hooks';

const UserAvatarComponent = ({id, name, photo}) => {
  // for make console.log with updated values, by default prefix is "[blum:log]: "
  useConsoleLog([id, name, photo], 'UserAvatarComponent: ');
  // -> UserAvatarComponent: id
  // -> UserAvatarComponent: name
  // -> UserAvatarComponent: photo

  // controlable debouncing, first arg is time when isLoading will set to false,
  // second one is initial value isLoading (default is false)
  const searchDebouncing = useDebouncing(300, true);
  const handleInput = useCallback(() => {
    if (!searchDebouncing.isLoading) {
      searchDebouncing.setLoading(true);
    }
  }, [searchDebouncing.isLoading]);

  // first arg is type event of window, second - callback with props fired event, the last for detect keyboard's button "K"
  useEventListener("offline", (e) => {
    console.log("app loss connection");
  });

  // get info is intersecting with user item or not
  const {ref, entry} = useIntersectionObserver();
  useEffect(() => {
    if (entry?.isIntersecting) {
      alert('You've read long text');
    }
  }, [entry?.isIntersecting]);

  // auto-clean interval hook, which will drops interval if delay or deps updated
  useInterval(() => {
    console.log('Promo banner?');
  }, 3000, []);

  // auto-clean timeout hook, which will run timeout each time if delay or deps updated
  useTimeout(() => {
    console.log('Timeout happen');
  }, 3000, []);

  return<>
    <input onChange={handleInput} />
    <div ref={ref}>
        Read long text to end
    </div>
  </>
};
```
