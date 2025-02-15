'use client';
import { Dialog, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";

const projectSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  contractor: z.string().min(2, "Contractor must be at least 2 characters")
});

export function ProjectDialog({ open , onOpenChange, onSuccess }) {
  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      contractor: ""
    }
  });

  const onSubmit = async (values) => {
    const newProject = await fetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify(values)
    }).then(res => res.json());

    onSuccess(newProject);
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{"Create New Project"}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contractor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contractor</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save Project</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}