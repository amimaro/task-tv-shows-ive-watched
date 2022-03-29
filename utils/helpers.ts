export const getData = async (url: string) => {
  console.log("getting,", url);

  const res: Response = await fetch(url, {
    method: "GET",
    credentials: "same-origin",
  });

  if (!res.ok) {
    console.log("Error in getData", { url, res });
    throw Error(res.statusText);
  }

  return res.json();
};

export const postData = async <T>({
  url,
  data,
}: {
  url: string;
  data?: any;
}): Promise<T> => {
  console.log("posting,", url, data);

  const res: Response = await fetch(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.log("Error in postData", { url, data, res });
    throw Error(res.statusText);
  }

  return res.json();
};

export const deleteData = async ({
  url,
  data,
}: {
  url: string;
  data?: any;
}) => {
  console.log("deleting,", url, data);

  const res: Response = await fetch(url, {
    method: "DELETE",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.log("Error in deleteData", { url, data, res });
    throw Error(res.statusText);
  }

  return res.json();
};

export const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};
