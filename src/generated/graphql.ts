import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export enum Category {
  Game = 'GAME',
  Other = 'OTHER',
  Project = 'PROJECT'
}

export type Image = {
  __typename?: 'Image';
  id?: Maybe<Scalars['ID']>;
  src?: Maybe<Scalars['String']>;
};

export type Metadata = {
  __typename?: 'Metadata';
  count: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject?: Maybe<Project>;
  createSkill?: Maybe<Skill>;
  deleteProject?: Maybe<Project>;
  deleteSkill?: Maybe<Skill>;
  login?: Maybe<Scalars['String']>;
  sendEmail?: Maybe<Scalars['String']>;
  updateProject?: Maybe<Project>;
  updateSkill?: Maybe<Skill>;
};


export type MutationCreateProjectArgs = {
  category: Category;
  description: Scalars['String'];
  image?: InputMaybe<Scalars['Upload']>;
  title: Scalars['String'];
};


export type MutationCreateSkillArgs = {
  image?: InputMaybe<Scalars['Upload']>;
  name: Scalars['String'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteSkillArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationSendEmailArgs = {
  email: Scalars['String'];
  message: Scalars['String'];
  name: Scalars['String'];
};


export type MutationUpdateProjectArgs = {
  category: Category;
  description: Scalars['String'];
  id: Scalars['ID'];
  image?: InputMaybe<Scalars['Upload']>;
  title: Scalars['String'];
};


export type MutationUpdateSkillArgs = {
  id: Scalars['ID'];
  image?: InputMaybe<Scalars['Upload']>;
  name: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  category: Category;
  description: Scalars['String'];
  id: Scalars['ID'];
  image?: Maybe<Image>;
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  Project?: Maybe<Project>;
  ProjectBySlug?: Maybe<Project>;
  Skill?: Maybe<Skill>;
  _allProjectsMeta?: Maybe<Metadata>;
  _allSkillsMeta?: Maybe<Metadata>;
  allProjects: Array<Project>;
  allSkills: Array<Skill>;
};


export type QueryProjectArgs = {
  id: Scalars['ID'];
};


export type QueryProjectBySlugArgs = {
  slug: Scalars['String'];
};


export type QuerySkillArgs = {
  id: Scalars['ID'];
};

export type Skill = {
  __typename?: 'Skill';
  id: Scalars['ID'];
  image?: Maybe<Image>;
  name: Scalars['String'];
};
