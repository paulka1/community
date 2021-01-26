import { MessageElement, MessageTextElement, Post, PostData, PostMessage } from '../post.model';

export class PostMapper {
  map(data: PostData): Post {
    return {
      ...data,
      message: this.parseMessage(data.message)
    }
  };

  private parseMessage(message: string): PostMessage {
    const pictureRegex = /http[s]?:\/\/.+\.(jpeg|jpg|gif|png)/gmi;

    const videoRegex = /http[s]?:\/\/.+\.(mp4|wmv|flv|avi|wav)/gmi;

    const audioRegex = /http[s]?:\/\/.+\.(mp3|ogg|wav)/gmi;

    const youtubeRegex = /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
    const attachements: MessageElement[] = [];

    const pictureMatche = pictureRegex.exec(message);
    if (pictureMatche) {
      console.log("imageMapper",pictureMatche )
      attachements.push({
        type: 'image',
        url: pictureMatche[0]
        }
      )
    }
    // https://www.youtube.com/watch?v=SsKT0s5J8ko&list=RDSsKT0s5J8ko&start_radio=1&ab_channel=MacMiller https://www.html5rocks.com/en/tutorials/video/basics/devstories.mp4 https://www.html5rocks.com/en/tutorials/video/basics/devstories.png
    const videoMatche = videoRegex.exec(message)
    if (videoMatche) {
      console.log("videoMatche",videoMatche )
      attachements.push({
          type: 'video',
          url: message
        }
      )
    }

    const audioMatche = audioRegex.exec(message)
    if (audioMatche) {
      console.log("audioMatche",audioMatche )
      attachements.push({
          type: 'audio',
          url: message
        }
      )
    }

    const youtubeMatche = youtubeRegex.exec(message)
    if (youtubeMatche) {
      console.log("youtubeMatche",youtubeMatche )
      attachements.push({
          type: 'youtube',
          videoId: youtubeMatche[0]
        }
      )
    }

    return {
      text: {
        type: 'text',
        content: message
      } as MessageTextElement,
      attachements
    };
  }
}
