import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Task } from "../models/tasks.models.js";
import { User } from "../models/user.models.js";

const registerTask = asyncHandler(async (req, res) => {

  //Fetch the data from the body
  //Then check if that data is present
  //Then create a new task
  //Check if the task is created or not
  //return res

  const {title, description} = req.body;

  // ([username, email, password].some((field) => field.trim() === ""))
  if ([title,description].some((field) => field.trim() === "")) { 
    throw new ApiError(400, "Credentials are missing");
  }

  const newTodo = await Task.create({
    title,
    description,
    user: req.user._id,
  })

  if(!newTodo){
    throw new ApiError(400, "Error while submitting task");
  }

  return res.status(200).json(new ApiResponse(200, {newTodo} ,"Task registered"));
});

const getTasks = asyncHandler(async(req,res) => {
  const userTask = await User.find({
    _id: req.user._id,
  }).populate("tasks").select("-username -email -password -refreshToken -avatar");

  return res
  .status(200)
  .json(new ApiResponse(200,  userTask, "Tasks Fetched Successfully"));
}) 

const updateTasks = asyncHandler(async(req,res) => {
  const {taskId} = req.params;
  const {title, description} = req.body;

  const task = await Task.findOne({
    _id: taskId,
    user: req.user?._id
  })

  if (!task) {
    throw new ApiError(400, "Task not found or Unauthorized");
  }

  if(title) task.title = title
  if(description) task.description = description

  const updatedTask = await task.save();

  return res
  .status(200)
  .json(new ApiResponse(200, updatedTask, "Task Updated Successfully"))


})

const deleteTask = asyncHandler(async(req,res) => {
  const { taskId } = req.params;
  const userId = req.user?._id;

  const task = await Task.findOneAndDelete({
    _id: taskId,
    user: userId
  })

  if (!task) {
    throw new ApiError(400, "Task not found");
  }

  return res
  .status(200)
  .json(new ApiResponse(200, "Task Deleted Successfully"));

})

export { registerTask, getTasks, updateTasks, deleteTask };
