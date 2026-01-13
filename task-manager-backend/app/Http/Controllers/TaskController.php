<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;

class TaskController extends Controller
{
    // Helper method to find a task or throw JSON response
    protected function findTaskOrFail($id): Task|JsonResponse
    {
        try {
            return Task::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            response()->json([
                'success' => false,
                'message' => 'Task not found'
            ], 404)->send();
            exit;
        }
    }

    // Get all tasks with optional filtering
    public function index(Request $request): JsonResponse
    {
        try {
            $filter = $request->query('filter'); // all, completed, pending

            $query = Task::query();

            if ($filter === 'completed') {
                $query->where('completed', true);
            } elseif ($filter === 'pending') {
                $query->where('completed', false);
            }

            $tasks = $query->latest()->get();

            return response()->json([
                'success' => true,
                'data' => $tasks
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch tasks',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Create a new task
    public function store(Request $request): JsonResponse
    {
        try {
            $data = $request->validate([
                'title' => 'required|string|max:255',
            ]);

            $task = Task::create($data);

            return response()->json([
                'success' => true,
                'message' => 'Task created successfully',
                'data' => $task
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create task',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update($id): JsonResponse
    {
        try {
            $task = $this->findTaskOrFail($id);
            $task->completed = !$task->completed;
            $task->save();

            return response()->json([
                'success' => true,
                'message' => 'Task updated successfully',
                'data' => $task
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update task',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Delete a task
    public function destroy($id): JsonResponse
    {
        try {
            $task = $this->findTaskOrFail($id);
            $task->delete();

            return response()->json([
                'success' => true,
                'message' => 'Task deleted successfully'
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete task',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
