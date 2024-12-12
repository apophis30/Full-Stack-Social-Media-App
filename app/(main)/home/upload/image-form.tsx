import { createPost } from "@/actions/post-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ImageForm = ({ imageUrl }: { imageUrl: string }) => {
  const { user } = useUser();
  const { toast } = useToast();
  const router = useRouter();

  const [caption, setCaption] = useState("");
  const [place, setPlace] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImagePost = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    try {
      const image = {
        userId: user?.id!,
        caption: caption,
        imageUrl: imageUrl,
        place: place,
        hashtags: hashtags,
      };

      await createPost(image);

      toast({
        title: "Success",
        description: "Post created successfully",
      });

      setCaption("");
      setPlace("");
      setHashtags("");

      router.push("/home");
    } catch (error) {
      console.log(error);

      toast({
        title: "Error",
        description: "Unable to create post",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full flex flex-col space-y-4" onSubmit={handleImagePost}>
      <div className="bg-white shadow-md p-4 rounded-md space-y-4">
        <h2 className="text-lg">Enter Image details</h2>
        <div className="flex items-center space-x-2">
          <Label htmlFor="caption" className="w-[80px]">
            Captions
          </Label>
          <Textarea
            className="bg-slate-100 w-full"
            placeholder="Enter caption"
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="place" className="w-[80px]">
            Place
          </Label>
          <Input
            className="bg-slate-100 w-full"
            placeholder="Enter Place"
            id="place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="hashtags" className="w-[80px]">
            Hashtags
          </Label>
          <Input
            className="bg-slate-100 w-full"
            placeholder="Enter hashtags"
            id="hashtags"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>

      <div className="bg-soft-black flex-1 flex items-center justify-between rounded-md shadow-md p-4">
        <p className="text-dark-blue-100">Post the picture to show everyone</p>
        <Button variant="custom" type="submit" disabled={loading}>
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Post"}
        </Button>
      </div>
    </form>
  );
};

export default ImageForm;
