import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/auth-context";
import { createDocument, getDocument, updateDocument, deleteDocument, queryDocuments } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function FirebaseDatabaseTest() {
  const [testId, setTestId] = useState<string>("");
  const [testData, setTestData] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuthContext();
  const { toast } = useToast();

  const testCollection = "test_collection";

  useEffect(() => {
    // Generate a unique test ID if none exists
    if (!testId && user) {
      setTestId(`test_${user.uid.substring(0, 6)}_${Date.now()}`);
    }
  }, [testId, user]);

  const handleCreate = async () => {
    if (!testId || !testData) {
      toast({
        title: "Validation Error",
        description: "Please provide both ID and data",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const data = { content: testData, createdAt: new Date().toISOString() };
      const res = await createDocument(testCollection, testId, data);
      setResult(res);
      toast({
        title: "Document Created",
        description: "Successfully created document in Firestore",
      });
    } catch (error: any) {
      console.error("Error creating document:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create document",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRead = async () => {
    if (!testId) {
      toast({
        title: "Validation Error",
        description: "Please provide document ID",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await getDocument(testCollection, testId);
      setResult(res);
      if (res) {
        toast({
          title: "Document Retrieved",
          description: "Successfully retrieved document from Firestore",
        });
      } else {
        toast({
          title: "Not Found",
          description: "Document does not exist",
        });
      }
    } catch (error: any) {
      console.error("Error reading document:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to read document",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!testId || !testData) {
      toast({
        title: "Validation Error",
        description: "Please provide both ID and data",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const data = { content: testData, updatedAt: new Date().toISOString() };
      const res = await updateDocument(testCollection, testId, data);
      setResult(res);
      toast({
        title: "Document Updated",
        description: "Successfully updated document in Firestore",
      });
    } catch (error: any) {
      console.error("Error updating document:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update document",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!testId) {
      toast({
        title: "Validation Error",
        description: "Please provide document ID",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await deleteDocument(testCollection, testId);
      setResult({ deleted: res, id: testId });
      toast({
        title: "Document Deleted",
        description: "Successfully deleted document from Firestore",
      });
    } catch (error: any) {
      console.error("Error deleting document:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete document",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuery = async () => {
    setIsLoading(true);
    try {
      // Find documents with content field that contains the testData
      const res = await queryDocuments(testCollection, "content", "==", testData);
      setResult(res);
      toast({
        title: "Query Executed",
        description: `Found ${res.length} matching documents`,
      });
    } catch (error: any) {
      console.error("Error querying documents:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to query documents",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Firebase Firestore Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="documentId">Document ID</label>
          <Input
            id="documentId"
            value={testId}
            onChange={(e) => setTestId(e.target.value)}
            placeholder="Enter document ID"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="documentData">Document Data</label>
          <Input
            id="documentData"
            value={testData}
            onChange={(e) => setTestData(e.target.value)}
            placeholder="Enter document data"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Button onClick={handleCreate} disabled={isLoading}>
            Create
          </Button>
          <Button onClick={handleRead} disabled={isLoading} variant="outline">
            Read
          </Button>
          <Button onClick={handleUpdate} disabled={isLoading} variant="secondary">
            Update
          </Button>
          <Button onClick={handleDelete} disabled={isLoading} variant="destructive">
            Delete
          </Button>
          <Button onClick={handleQuery} disabled={isLoading} className="col-span-2">
            Query
          </Button>
        </div>
        
        {result && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <h3 className="text-sm font-medium mb-2">Result:</h3>
            <pre className="text-xs overflow-auto max-h-60">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}