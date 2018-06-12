import Tag from "../models/Tag";
import { TagData, Websocket, WebsocketTagMessage } from "./../helpers/Websocket";

const endpoint: string = "http://localhost:8080";
const wsEndpoint: string = "ws://localhost:8080";

class TagService {
  async getTags(): Promise<Tag[]> {
    // return fetch(`${endpoint}/tags`)
    return fetch(`${endpoint}/dummyData/tags.json`)
      .then((response) => response.json())
      .then((tagsDto: any[]) => {
        return tagsDto.map(Tag.newFromDto);
      });
  }

  async getTagById(id: string): Promise<Tag> {
    return fetch(`${endpoint}/tags/${id}`)
      .then((response) => response.json())
      .then((tagDto) => {
        return Tag.newFromDto(tagDto);
      });
  }

  async getTagDataById(id: string, limit: number = 150): Promise<TagData[]> {
    return fetch(`${endpoint}/tags/${id}?limit=${limit}`)
      .then((response) => response.json());
  }

  initiateStreamForTagById(id: string, {
    onmessage = (message) => {
      return;
    },
    onopen = (open: any) => {
      return;
    },
    onclose = (close: any) => {
      return;
    },
    onerror = (error: any) => {
      return;
    },
  } = {}): Websocket {
    return new Websocket({
      url: `${wsEndpoint}/tag/${id}/stream`,
      onclose: onclose,
      onerror: onerror,
      onmessage: onmessage,
      onopen: onopen,
    });
  }

  initiateStreamForTags({
    onmessage = (message: WebsocketTagMessage) => {
      return;
    },
    onopen = (open: any) => {
      return;
    },
    onclose = (close: any) => {
      return;
    },
    onerror = (error: any) => {
      return;
    },
  } = {}): Websocket {
    return new Websocket({
      url: `${wsEndpoint}/tags/stream`,
      onclose: onclose,
      onerror: onerror,
      onmessage: onmessage,
      onopen: onopen,
    });
  }
}

export default new TagService();
