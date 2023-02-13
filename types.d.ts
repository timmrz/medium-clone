export interface IPost {
	_id: string;
	author: IAuthor;
	description: string;
	mainImage: MainImage;
	publishedAt: string;
	slug: Slug;
	title: string;
	// categories: Category[];
	body: any;
	comments: Comment[];
	categories: ICategory;
}

export interface ICategory {
	_id: string;
	title: string;
	slug: Slug;
	posts?: IPost[];
}

export interface Comment {
	_createdAt: string;
	_id: string;
	_rev: string;
	_type: string;
	_updatedAt: string;
	comment: string;
	email: string;
	name: string;
	post: {
		_ref: string;
		_type: string;
	};
}

// interface Category {
// 	key: string;
// 	_ref: string;
// 	_type: string;
// }

export interface IAuthor {
	image: {
		_type: string;
		assets: {
			_ref: string;
			_type: string;
		};
	};
	name: string;
	bio: any;
	follows: number;
	_id: string;
	slug: Slug;
	posts?: IPost[];
}

export interface Body {
	_key: string;
	_type: string;
	children?: Children[];
	markDefs?: any[];
	style?: string;
	asset?: Asset;
}

export interface Children {
	_key: string;
	_type: string;
	marks: any[];
	text: string;
}

export interface Asset {
	_ref: string;
	_type: string;
}

export interface MainImage {
	_type: string;
	asset: Asset2;
}

export interface Asset2 {
	_ref: string;
	_type: string;
}

export interface Slug {
	_type: string;
	current: string;
}
