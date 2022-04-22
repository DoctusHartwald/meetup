import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type ItemMetaData = {
  readOnlyFields: 'updatedAt';
}

export declare class Item {
  readonly id: string;
  readonly userEmail: string;
  readonly title?: string | null;
  readonly price: number;
  readonly createdAt?: string | null;
  readonly picture?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Item, ItemMetaData>);
  static copyOf(source: Item, mutator: (draft: MutableModel<Item, ItemMetaData>) => MutableModel<Item, ItemMetaData> | void): Item;
}