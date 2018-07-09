const fun = (callback, err) => {
  try {
    // do something
    callback();
  } catch(e) {
    err(e);
  }
}

const funAsync = () => new Promise((resolve, reject) => {
  fun(resolve, reject);
});

(async () => await funAsync())();

const fun1 = async () => 0;

fun1().then(() => { });
