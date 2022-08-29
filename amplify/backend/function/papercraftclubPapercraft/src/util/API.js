"use strict";
/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
exports.__esModule = true;
exports.SearchableTagAggregateField = exports.SearchableTagSortableFields = exports.SearchableBuildAggregateField = exports.SearchableBuildSortableFields = exports.SearchablePapercraftAggregateField = exports.SearchablePapercraftSortableFields = exports.SearchableUserAggregateField = exports.SearchableAggregateType = exports.SearchableSortDirection = exports.SearchableUserSortableFields = exports.Difficulty = exports.ModelAttributeTypes = void 0;
var ModelAttributeTypes;
(function (ModelAttributeTypes) {
    ModelAttributeTypes["binary"] = "binary";
    ModelAttributeTypes["binarySet"] = "binarySet";
    ModelAttributeTypes["bool"] = "bool";
    ModelAttributeTypes["list"] = "list";
    ModelAttributeTypes["map"] = "map";
    ModelAttributeTypes["number"] = "number";
    ModelAttributeTypes["numberSet"] = "numberSet";
    ModelAttributeTypes["string"] = "string";
    ModelAttributeTypes["stringSet"] = "stringSet";
    ModelAttributeTypes["_null"] = "_null";
})(ModelAttributeTypes = exports.ModelAttributeTypes || (exports.ModelAttributeTypes = {}));
var Difficulty;
(function (Difficulty) {
    Difficulty["insane"] = "insane";
    Difficulty["hard"] = "hard";
    Difficulty["medium"] = "medium";
    Difficulty["easy"] = "easy";
})(Difficulty = exports.Difficulty || (exports.Difficulty = {}));
var SearchableUserSortableFields;
(function (SearchableUserSortableFields) {
    SearchableUserSortableFields["username"] = "username";
    SearchableUserSortableFields["email"] = "email";
    SearchableUserSortableFields["description"] = "description";
    SearchableUserSortableFields["website"] = "website";
    SearchableUserSortableFields["instagram"] = "instagram";
    SearchableUserSortableFields["twitter"] = "twitter";
    SearchableUserSortableFields["id"] = "id";
    SearchableUserSortableFields["createdAt"] = "createdAt";
    SearchableUserSortableFields["updatedAt"] = "updatedAt";
})(SearchableUserSortableFields = exports.SearchableUserSortableFields || (exports.SearchableUserSortableFields = {}));
var SearchableSortDirection;
(function (SearchableSortDirection) {
    SearchableSortDirection["asc"] = "asc";
    SearchableSortDirection["desc"] = "desc";
})(SearchableSortDirection = exports.SearchableSortDirection || (exports.SearchableSortDirection = {}));
var SearchableAggregateType;
(function (SearchableAggregateType) {
    SearchableAggregateType["terms"] = "terms";
    SearchableAggregateType["avg"] = "avg";
    SearchableAggregateType["min"] = "min";
    SearchableAggregateType["max"] = "max";
    SearchableAggregateType["sum"] = "sum";
})(SearchableAggregateType = exports.SearchableAggregateType || (exports.SearchableAggregateType = {}));
var SearchableUserAggregateField;
(function (SearchableUserAggregateField) {
    SearchableUserAggregateField["username"] = "username";
    SearchableUserAggregateField["email"] = "email";
    SearchableUserAggregateField["description"] = "description";
    SearchableUserAggregateField["website"] = "website";
    SearchableUserAggregateField["instagram"] = "instagram";
    SearchableUserAggregateField["twitter"] = "twitter";
    SearchableUserAggregateField["id"] = "id";
    SearchableUserAggregateField["createdAt"] = "createdAt";
    SearchableUserAggregateField["updatedAt"] = "updatedAt";
})(SearchableUserAggregateField = exports.SearchableUserAggregateField || (exports.SearchableUserAggregateField = {}));
var SearchablePapercraftSortableFields;
(function (SearchablePapercraftSortableFields) {
    SearchablePapercraftSortableFields["title"] = "title";
    SearchablePapercraftSortableFields["description"] = "description";
    SearchablePapercraftSortableFields["width_in"] = "width_in";
    SearchablePapercraftSortableFields["height_in"] = "height_in";
    SearchablePapercraftSortableFields["length_in"] = "length_in";
    SearchablePapercraftSortableFields["verified"] = "verified";
    SearchablePapercraftSortableFields["id"] = "id";
    SearchablePapercraftSortableFields["createdAt"] = "createdAt";
    SearchablePapercraftSortableFields["updatedAt"] = "updatedAt";
    SearchablePapercraftSortableFields["userPapercraftsId"] = "userPapercraftsId";
})(SearchablePapercraftSortableFields = exports.SearchablePapercraftSortableFields || (exports.SearchablePapercraftSortableFields = {}));
var SearchablePapercraftAggregateField;
(function (SearchablePapercraftAggregateField) {
    SearchablePapercraftAggregateField["title"] = "title";
    SearchablePapercraftAggregateField["description"] = "description";
    SearchablePapercraftAggregateField["difficulty"] = "difficulty";
    SearchablePapercraftAggregateField["width_in"] = "width_in";
    SearchablePapercraftAggregateField["height_in"] = "height_in";
    SearchablePapercraftAggregateField["length_in"] = "length_in";
    SearchablePapercraftAggregateField["verified"] = "verified";
    SearchablePapercraftAggregateField["id"] = "id";
    SearchablePapercraftAggregateField["createdAt"] = "createdAt";
    SearchablePapercraftAggregateField["updatedAt"] = "updatedAt";
    SearchablePapercraftAggregateField["userPapercraftsId"] = "userPapercraftsId";
})(SearchablePapercraftAggregateField = exports.SearchablePapercraftAggregateField || (exports.SearchablePapercraftAggregateField = {}));
var SearchableBuildSortableFields;
(function (SearchableBuildSortableFields) {
    SearchableBuildSortableFields["description"] = "description";
    SearchableBuildSortableFields["verified"] = "verified";
    SearchableBuildSortableFields["id"] = "id";
    SearchableBuildSortableFields["createdAt"] = "createdAt";
    SearchableBuildSortableFields["updatedAt"] = "updatedAt";
    SearchableBuildSortableFields["userBuildsId"] = "userBuildsId";
    SearchableBuildSortableFields["papercraftBuildsId"] = "papercraftBuildsId";
})(SearchableBuildSortableFields = exports.SearchableBuildSortableFields || (exports.SearchableBuildSortableFields = {}));
var SearchableBuildAggregateField;
(function (SearchableBuildAggregateField) {
    SearchableBuildAggregateField["description"] = "description";
    SearchableBuildAggregateField["verified"] = "verified";
    SearchableBuildAggregateField["id"] = "id";
    SearchableBuildAggregateField["createdAt"] = "createdAt";
    SearchableBuildAggregateField["updatedAt"] = "updatedAt";
    SearchableBuildAggregateField["userBuildsId"] = "userBuildsId";
    SearchableBuildAggregateField["papercraftBuildsId"] = "papercraftBuildsId";
})(SearchableBuildAggregateField = exports.SearchableBuildAggregateField || (exports.SearchableBuildAggregateField = {}));
var SearchableTagSortableFields;
(function (SearchableTagSortableFields) {
    SearchableTagSortableFields["title"] = "title";
    SearchableTagSortableFields["id"] = "id";
    SearchableTagSortableFields["createdAt"] = "createdAt";
    SearchableTagSortableFields["updatedAt"] = "updatedAt";
})(SearchableTagSortableFields = exports.SearchableTagSortableFields || (exports.SearchableTagSortableFields = {}));
var SearchableTagAggregateField;
(function (SearchableTagAggregateField) {
    SearchableTagAggregateField["title"] = "title";
    SearchableTagAggregateField["id"] = "id";
    SearchableTagAggregateField["createdAt"] = "createdAt";
    SearchableTagAggregateField["updatedAt"] = "updatedAt";
})(SearchableTagAggregateField = exports.SearchableTagAggregateField || (exports.SearchableTagAggregateField = {}));
