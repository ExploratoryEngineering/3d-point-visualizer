interface TagDto {
  id: string;
  name: string;
}

export default class Tag {
  static newFromDto(tag: TagDto): Tag {
    return new Tag({
      id: tag.id,
      name: tag.name,
    });
  }

  static toDto(tag: Tag): TagDto {
    return {
      id: tag.id,
      name: tag.name,
    };
  }

  id: string;
  name: string;

  constructor({
    id = "-1",
    name = "unnamed",
  } = {}) {
    this.id = id;
    this.name = name;
  }
}
