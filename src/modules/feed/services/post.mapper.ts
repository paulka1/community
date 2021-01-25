import { MessageAudioElement, MessageElement, MessageImageElement, MessageTextElement, MessageVideoElement, MessageYoutubeElement, Post, PostData, PostMessage } from '../post.model';

export class PostMapper {
  map(data: PostData): Post {
    return {
      ...data,
      message: this.parseMessage(data.message)
    }
  };

  private parseMessage(message: string): PostMessage {
    // TODO rajouter png jpg et gif
    const pictureRegex = /http[s]?:\/\/.+\.(jpeg|jpg|gif|png)/gmi;

     // TODO mp4,wmv,flv,avi,wav
    const videoRegex = /http[s]?:\/\/.+\.(mp4|wmv|flv|avi|wav)/gmi;

     // TODO mp3,ogg,wav
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

    const videoMatche = videoRegex.exec(message)
    if (videoMatche) {
      attachements.push({
          type: 'video',
          url: message
        }
      )
    }

    const audioMatche = audioRegex.exec(message)
    if (audioMatche) {
      attachements.push({
          type: 'audio',
          url: message
        }
      )
    }

    const youtubeMatche = youtubeRegex.exec(message)
    if (youtubeMatche) {
      attachements.push({
          type: 'youtube',
          videoId: youtubeMatche[1]
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
