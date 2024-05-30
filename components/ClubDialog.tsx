import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";

import { useState } from "react";

const supabase = createClient();

async function uploadFile(file) {
  const { data, error } = await supabase.storage
    .from("images")
    .upload(`${file.name}`, file, { upsert: true });
  if (error) {
    console.log(error);
  } else {
    // console.log(data);
    return data;
  }
}

export default function ClubDialog({
  email,
  isOpen,
  setIsOpen,
}: {
  email: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}): JSX.Element {
  //   const [isOpen, setIsOpen] = useState(false);

  const [pic, setPic] = useState(null);
  const [description, setDescription] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const uploadData = await uploadFile(file);
      if (uploadData) {
        const { data } = supabase.storage
          .from("images")
          .getPublicUrl(uploadData.path);
        // console.log(data);
        setPic(data.publicUrl);
      }
    }
  };

  const onSubmit = async () => {
    const club_info = {
      club_email: email,
      club_description: description,
      image_url: pic,
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/updateClubInfo/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(club_info),
      }
    );
    const data = await response.json();
    // console.log(data);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Club Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              defaultValue=""
              className="col-span-3"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <Input type="file" placeholder="shadcn" onChange={handleFileChange} />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
