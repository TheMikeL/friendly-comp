export const userAuthentication = (requestBody) => {
  return fetch('http://localhost:3001/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then((res) => {
    if (res.status !== 200 && res.status !== 201){
      throw new Error('Failed!');
    }
      return res.json();
  }).then((resData) => {
    if (resData.data && resData.data.login){
      return resData.data.login;
    }else {
      console.log("User Created");
    }
  }).catch((err) => {
    console.log(err);
  });
}