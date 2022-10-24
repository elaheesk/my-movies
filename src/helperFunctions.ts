import { movieType } from "./types";

export const handleLikePropety = (
	list: movieType[],
	likedObject: movieType
) => {
	const changePropertyValue = list.map((eachObject: any) => {
		if (likedObject.id === eachObject.id) {
			return { ...likedObject, liked: !eachObject.liked }; //här ändrar vi värdet till motsatsen av defaultvärdet av liked. om liked är true ändras det till motsatsen false, om liked är false ändras det till motstsen true. liked: !product.liked
		} else {
			return eachObject;
		}
	});
	return changePropertyValue;
};
