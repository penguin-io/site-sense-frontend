'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

export function SitesList({ project }) {
  const [sites, setSites] = useState(project.sites);

  const handleStatusChange = async (siteId: string, checked: boolean) => {
    const updatedSite = await fetch(`/api/sites/${siteId}`, {
      method: 'PUT',
      body: JSON.stringify({ status: checked ? 'ACTIVE' : 'INACTIVE' })
    }).then(res => res.json());

    setSites(sites.map(s => s.id === siteId ? updatedSite : s));
  };

  return (
    <Table className="mt-4">
      <TableHeader>
        <TableRow>
          <TableHead>Site Name</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Incharge</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sites.map(site => (
          <TableRow key={site.id}>
            <TableCell>{site.name}</TableCell>
            <TableCell>{site.location}</TableCell>
            <TableCell>{site.incharge}</TableCell>
            <TableCell>
              <Switch
                checked={site.status === 'ACTIVE'}
                onCheckedChange={(checked) => handleStatusChange(site.id, checked)}
              />
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <SiteEditDialog site={site} />
                <Button variant="destructive" size="sm">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}