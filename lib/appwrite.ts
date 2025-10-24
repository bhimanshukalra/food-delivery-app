import { Category } from "@/components/Filter";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
  TablesDB,
} from "react-native-appwrite";

export const appwriteConfig = {
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID ?? "",
  endoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT ?? "",
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM ?? "",
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABSE_ID ?? "",
  userTableId: process.env.EXPO_PUBLIC_APPWRITE_USER_TABLE_ID ?? "",
  categoriesTableId: process.env.EXPO_PUBLIC_APPWRITE_CATEGORIES_TABLE_ID ?? "",
  menuTableId: process.env.EXPO_PUBLIC_APPWRITE_MENU_TABLE_ID ?? "",
  customizationsTableId:
    process.env.EXPO_PUBLIC_APPWRITE_CUSTOMIZATIONS_TABLE_ID ?? "",
  menuCustomizationsTableId:
    process.env.EXPO_PUBLIC_APPWRITE_MENU_CUSTOMIZATIONS_TABLE_ID ?? "",
  bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID ?? "",
};

export const client = new Client()
  .setEndpoint(appwriteConfig.endoint)
  .setPlatform(appwriteConfig.platform)
  .setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const tables = new TablesDB(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);
export const storage = new Storage(client);

interface CreateuserParams {
  email: string;
  password: string;
  name: string;
}

export const createUser = async ({
  name,
  email,
  password,
}: CreateuserParams) => {
  try {
    const newAccount = await account.create({
      userId: ID.unique(),
      email,
      password,
      name,
    });
    if (!newAccount) {
      throw Error("Account couldn't be created");
    }
    await signIn({ email, password });

    const avatar = avatars.getInitialsURL(name).toString();

    const newUser = await tables.createRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.userTableId,
      rowId: ID.unique(),
      data: { accountId: newAccount.$id, email, name, avatar },
    });

    return newUser;
  } catch (error) {
    console.error(error);
    throw new Error(error as string);
  }
};

interface SignInParams {
  email: string;
  password: string;
}

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession({
      email,
      password,
    });
  } catch (error) {
    console.error(error);
    throw new Error(error as string);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) {
      throw Error("No session found");
    }

    const currentUser = await tables.listRows({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.userTableId,
      queries: [Query.equal("accountId", currentAccount.$id)],
    });

    if (!currentUser || currentUser.total === 0) {
      throw Error("No user found");
    }
    return currentUser.rows[0];
  } catch (error) {
    console.error("getCurrentUser error", error);
    throw Error(error as string);
  }
};

interface GetMenuParams {
  category?: string;
  query?: string;
}

export const getMenu = async ({ category, query }: GetMenuParams) => {
  try {
    const queries: string[] = [];

    if (category) {
      queries.push(Query.equal("categories", category));
    }
    if (query) {
      queries.push(Query.search("name", query));
    }

    const menu = await tables.listRows({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.menuTableId,
      queries,
    });

    return menu.rows;
  } catch (error) {
    throw Error(error as string);
  }
};

export const getCategories = async ({ category, query }: GetMenuParams) => {
  try {
    const categories = await tables.listRows({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.categoriesTableId,
    });

    return categories.rows as unknown as Category[];
  } catch (error) {
    throw Error(error as string);
  }
};
