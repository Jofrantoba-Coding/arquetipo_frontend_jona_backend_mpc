import React from "react";
import Button from "container/Button";

export default function TestPage() {
    <div className="space-y-2 ">
        <h1 className="text-blue-600 md:text-gray-600">Test Page</h1>
        <Button label="Test Button" buttonType={"error"} />
        <Button label="Test Button" buttonType={"warning"} />
        <Button label="Test Button" buttonType={"primary"} />
        <Button label="Test Button" buttonType={"secondary"} />
        <Button label="Test Button" buttonType={"info"} />
    </div>
}
